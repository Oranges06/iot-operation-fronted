<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="协议名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="协议名称"></el-input>
  </el-form-item>
  <el-form-item label="协议描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="协议描述"></el-input>
  </el-form-item>
  </el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useProtocolApi, useProtocolSubmitApi } from '@/api/platform/protocol'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	description: '',
	createTime: '',
	updateTime: '',
	deleted: ''})

const init = (id?: number) => {
	if (id) {
		getProtocol(id)
	}
}

const getProtocol = (id: number) => {
	useProtocolApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	description: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useProtocolSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
