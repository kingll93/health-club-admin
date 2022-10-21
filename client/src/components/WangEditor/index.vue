<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" :mode="mode" />
    <!-- 编辑器 -->
    <Editor :defaultConfig="editorConfig" v-model="modelValue" @onChange="handleChange"
      style="height: 500px; overflow-y: hidden" :mode="mode" @onCreated="handleCreated" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, reactive, toRefs, computed } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// API 引用
import { uploadFile } from '@/api/common/file';

const props = defineProps({
  modelValue: {
    type: [String],
    default: ''
  },
});

const emit = defineEmits(['update:modelValue', 'getText']);

	// 子组件定义自己的 modelValue
	const modelValue = computed({
    	get: () => props.modelValue,
    	set: (value) => emit("update:modelValue", value),
	})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
defineExpose({
  getText
})

const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义图片上传
        async customUpload(file: any, insertFn: any) {
          uploadFile(file).then(response => {
            const url = response.data;
            insertFn(url);
          });
        }
      }
    },
  },
  mode: 'default'
});

const { toolbarConfig, editorConfig, mode } = toRefs(state);

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

function handleChange(editor: any) {
  modelValue.value = editor.getHtml();
  emit('getText', editor.getText());
}

function getText(): string {
  if (editorRef.value) {
    return editorRef.value.getText()
  } else {
    return ''
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style src="@wangeditor/editor/dist/css/style.css">
</style>
