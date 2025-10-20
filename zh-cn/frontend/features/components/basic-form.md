# BasicForm 组件使用说明（详尽）

该文档介绍项目中封装的 `BasicForm` 组件（路径：`src/components/crud-table/BasicForm.vue`）的设计理念、API、字段配置、使用示例、响应式栅格（cols）以及常见问题和调试方法，帮助你在项目里快速集成和自定义表单。

> 注：`BasicForm` 基于 Naive UI 的 `NForm` / `NFormItem` 封装，目标是以声明式字段数组快速构建表单，同时保留 Naive UI 的原生能力（props、rules、插槽等）。

---

## 一、核心设计思想

- 以字段配置（`fields: Field[]`）来声明表单项，降低表单模板重复写法。
- 明确分离表单项配置与控件配置：
  - `formItemProps`：直接映射到 `NFormItem` 的属性（例如 `path/label/required/showError` 等）。
  - `component` 与 `componentProps`：用于渲染控件（例如 `NSelect`、`NInputNumber`、自定义组件），`componentProps` 透传给控件。
- 支持栅格布局：通过 `cols`（可响应式）控制列数；在字段上支持 `colSpan` / `rowSpan` 做跨列/跨行布局。
- 暴露 form 操作：`submit`、`reset`、`validate`（可通过 `ref` 调用）。

---

## 二、文件位置

- 组件：`src/components/crud-table/BasicForm.vue`
- 示例：`src/views/demo/BasicFormDemo.vue`

---

## 三、Props 与 Emits（接口）

### Props

BasicForm 的 props 基于 Naive UI 的 `FormProps` 扩展，常用字段如下：

- `fields: Field[]`（必需）
  - 表单项数组，详见下文 Field 定义。
- `modelValue?: Record<string, any>`
  - 表单数据的 v-model，组件会同步 `update:modelValue`。
- `cols?: number | Record<string, number>`
  - 栅格列数：可以是数字（固定列数），也可以是响应式对象（例如 `{ default: 1, sm: 2, md: 3 }`，支持预设断点 `sm/md/lg/xl` 或自定义 media query key）。
- `gap?: string`（默认 `'16px'`）
  - 栅格间距，CSS 长度字符串。
- `showDefaultFooter?: boolean`（默认 `true`）
  - 是否显示默认的底部提交/重置按钮。
- `footerFullSpan?: boolean`（默认 `true`）
  - footer 是否默认横跨全部列（将会设置 `grid-column: 1 / -1`）。

此外，其他所有 Naive UI 的 `FormProps` 都可以直接传入并会被透传给内部的 `NForm`（例如 `labelPlacement/size/statusIcon` 等）。

### Emits

- `update:modelValue` — 当内部表单数据变化时发出，保持 v-model 双向绑定。
- `submit` — 校验通过后触发，参数为当前表单数据。
- `reset` — 当调用组件的 reset 时触发。
- `validateFail` — 校验失败时触发，参数为错误信息对象。

---

## 四、Field 类型（字段配置）

每一项字段的 shape（TypeScript 类型大致如下）：

```ts
type Field = {
  key: string                // 对应 model 的字段名
  label?: string             // 字段标签（可放在 formItemProps.label）
  formItemProps?: Partial<FormItemProps> & Partial<FormItemGiProps> // 透传给 NFormItem
  component?: any            // 渲染控件（例如 NSelect / NInputNumber / NDatePicker / 自定义）
  componentProps?: Record<string, any> // 透传给控件
  placeholder?: string      // 占位符快捷字段（会透传给控件）
  colSpan?: number          // 跨列（grid-column: span X）
  rowSpan?: number          // 跨行（grid-row: span X）
}
```

使用说明要点：
- `formItemProps` 推荐用于 `first/label` 等 `NFormItem` 层面的属性。
- `component` 必须使用支持 `v-model:value` 的组件（Naive UI 的控件默认支持）；若第三方或自定义组件未支持，请写一个适配 wrapper。
- `componentProps` 用于传递控件级别属性（例如 `options/min/max/type/valueFormat` 等）。

---

## 五、常用用法示例

下面给出若干常见使用场景，复制粘贴即可运行（假设项目已安装并能运行 Naive UI）。

### 1) 基本示例（NInput / NSelect / NInputNumber）

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import BasicForm from '@/components/crud-table/BasicForm.vue'
import { NSelect, NInputNumber, NDatePicker } from 'naive-ui'

const form = reactive({ name: '', age: null, gender: null })
const fields = [
  { key: 'name', label: '姓名', placeholder: '请输入姓名', formItemProps: { required: true } },
  { key: 'age', label: '年龄', component: NInputNumber, componentProps: { min: 0, max: 120 } },
  { key: 'gender', label: '性别', component: NSelect, componentProps: { options: [{ label: '男', value: 'M' }, { label: '女', value: 'F' }] } }
]

function onSubmit(payload) { console.log('submit', payload) }
</script>

<template>
  <BasicForm v-model="form" :fields="fields" @submit="onSubmit" />
</template>
```

### 2) 程序化控制（通过 ref 调用 validate/submit/reset）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import BasicForm from '@/components/crud-table/BasicForm.vue'
const formRef = ref(null)

// 在模板中：
// <BasicForm ref="formRef" v-model="form" :fields="fields" />

async function trySubmit() {
  const res = await formRef.value.validate()
  if (res.valid) formRef.value.submit()
  else console.log('errors', res.errors)
}
</script>
```

### 3) 栅格（cols）与跨列/跨行（colSpan/rowSpan）示例

```vue
<BasicForm
  v-model="form"
  :fields="[
    { key: 'a', label: 'A', colSpan: 2 },
    { key: 'b', label: 'B' },
    { key: 'c', label: 'C', rowSpan: 2 },
    { key: 'd', label: 'D' }
  ]"
  :cols="3"
  gap="12px"
/>
```

### 4) 响应式 cols（示例）

```vue
<BasicForm :cols="{ default: 1, sm: 2, md: 3 }" :fields="fields" />
```

- `sm/md/lg/xl` 映射到默认断点：`sm: 640px, md: 768px, lg: 1024px, xl: 1280px`。
- 也可以传自定义 media query key：例如 `:cols="{ default:1, '(min-width:900px)': 4 }"`。

---

## 六、footer 与插槽

- 默认提供 `footer` 插槽：如果未传入 `footer`，组件会在底部渲染默认的“重置 / 提交”按钮（受 `showDefaultFooter` 控制）。
- `footerFullSpan`（默认 true）会让 footer 横跨整行（`grid-column: 1 / -1`）。你可以覆盖：

```vue
<BasicForm ...>
  <template #footer>
    <div style="grid-column: 1 / -1; display:flex; justify-content:flex-end; gap:12px;">
      <NButton @click="reset">取消</NButton>
      <NButton type="primary" @click="submit">保存</NButton>
    </div>
  </template>
</BasicForm>
```

---

## 七、类型提示与导出（建议）

- 如果你需要在多个文件复用 `Field`、`BasicFormProps` 类型，建议将类型导出到 `src/types` 并在父组件中 import 使用，以获得更好的 TS 提示。
- `component` 字段类型可以写为 `Component` 或 `DefineComponent`（取决于你的项目类型设置），`componentProps` 用 `Record<string, any>` 或更精确的控件 props 类型。

---

## 八、调试与常见问题

1. 媒体查询无效
  - 请确保 `cols` 的写法为响应式对象，并且在浏览器端（客户端 mount）运行；组件在 `onMounted` 注入 media-query 样式，服务器端渲染（SSR）场景不会注入这些样式。
  - 在 DevTools 的 head 中查找 `<style data-basic-form-style="basic-form-...">`，确认 CSS 已注入。

2. 自定义控件未触发 v-model 同步
  - 请确保自定义控件支持 `v-model:value`（即 emit `update:value`）；若只支持 `value`/`input`，请包一层 adapter 组件。

3. colSpan/rowSpan 行为异常
  - CSS Grid 的排布遵循标准流，跨列/跨行会影响后续元素位置，请根据布局需求调整字段顺序或调整 colSpan 值。

4. 需要把 footer 默认跨列关闭
  - 通过 `:footerFullSpan="false"` 关闭组件自动给 footer 跨列样式。

---

## 九、建议与可扩展点

- 将 `breakpointMap` 与项目全局断点保持一致（可读取 Tailwind 配置或全局变量），我可以帮你把它改为从项目配置读取。
- 添加 field-level 命名插槽（例如 `#field-<key>`）以支持极复杂的自定义渲染。
- 提供单元测试（Vitest）覆盖 v-model、校验、响应式样式注入、colSpan/rowSpan 行为。

---

## 十、完整示例代码

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import BasicForm from '@/components/crud-table/BasicForm.vue'
import { NInput, NInputNumber, NSelect, NDatePicker, NButton } from 'naive-ui'

const formRef = ref<any>(null)

const model = reactive({
  name: '',
  age: null,
  gender: null,
  notes: '',
  birthday: null,
})

const fields = [
  {
    key: 'name',
    label: '姓名',
    placeholder: '请输入姓名',
    formItemProps: { required: true },
    colSpan: 2,
  },
  {
    key: 'age',
    label: '年龄',
    component: NInputNumber,
    componentProps: { min: 0, max: 120 },
    colSpan: 1,
  },
  {
    key: 'notes',
    label: '备注',
    component: NInput,
    componentProps: { type: 'textarea', rows: 4 },
    // 跨两行示例
    rowSpan: 2,
    colSpan: 1,
  },
  {
    key: 'gender',
    label: '性别',
    component: NSelect,
    componentProps: {
      options: [
        { label: '男', value: 'M' },
        { label: '女', value: 'F' },
      ],
      clearable: true,
    },
    colSpan: 1,
  },
  {
    key: 'birthday',
    label: '生日',
    component: NDatePicker,
    componentProps: { type: 'date', valueFormat: 'YYYY-MM-DD' },
  },
]

function onSubmit(payload: Record<string, any>) {
  // 简单演示提交数据
  // eslint-disable-next-line no-console
  console.log('BasicForm 提交：', payload)
}

async function trySubmit() {
  if (!formRef.value) return
  const res = await formRef.value.validate()
  if (res.valid) {
    // 触发组件内部 submit（会 emit submit 事件）
    formRef.value.submit()
  } else {
    // eslint-disable-next-line no-console
    console.warn('校验失败：', res.errors)
  }
}

function doReset() {
  formRef.value?.reset()
}
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-medium">BasicForm 示例 — 响应式栅格 & 跨列 / 跨行</h2>

    <section class="bg-white p-4 rounded shadow-sm">
      <h3 class="mb-3 font-medium">示例：默认 footer（自动跨列） + 响应式 cols</h3>

      <!-- cols 使用响应式对象：default / sm / md -->
      <BasicForm
        ref="formRef"
        v-model="model"
        :fields="fields"
        :cols="{ default: 1, sm: 2, md: 3 }"
        gap="12px"
        @submit="onSubmit"
      />

      <div class="mt-4 flex gap-2">
        <NButton @click="trySubmit" type="primary">程序化提交</NButton>
        <NButton @click="doReset">重置</NButton>
      </div>
    </section>

    <section class="bg-white p-4 rounded shadow-sm">
      <h3 class="mb-3 font-medium">示例：自定义 footer（仍可跨列）</h3>

      <BasicForm
        v-model="model"
        :fields="fields"
        :cols="3"
        gap="12px"
        @submit="onSubmit"
      >
        <template #footer>
          <!-- 自定义 footer，手动设置跨列样式，或依赖组件的 footerFullSpan（默认行为） -->
          <div style="grid-column: 1 / -1; display:flex; justify-content:flex-end; gap:12px;">
            <NButton @click="doReset">取消</NButton>
            <NButton type="primary" @click="trySubmit">保存</NButton>
          </div>
        </template>
      </BasicForm>
    </section>

    <section class="bg-white p-4 rounded shadow-sm">
      <h3 class="mb-3 font-medium">示例：简洁用法（单列）</h3>
      <BasicForm v-model="model" :fields="fields" :cols="1" gap="8px" @submit="onSubmit" />
    </section>
  </div>
</template>

<style scoped>
/* 小样式仅用于示例页面 */
.bg-white { background: #fff }
.shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.06) }
.rounded { border-radius: 6px }
.p-4 { padding: 16px }
.p-6 { padding: 24px }
.mt-4 { margin-top: 16px }
.mb-3 { margin-bottom: 12px }
.space-y-6 > * + * { margin-top: 24px }
.text-xl { font-size: 1.25rem }
.font-medium { font-weight: 500 }
.flex { display: flex }
.gap-2 { gap: 8px }
</style>


```

---

如果你希望我把 README 放到其它位置、把类型导出、或把演示页自动注册到路由里，我可以继续修改并运行静态检查与简单测试，请告诉我你的下一个动作。
