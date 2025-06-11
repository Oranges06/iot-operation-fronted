<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="套餐id" prop="packageId">
      <el-input v-model="dataForm.packageId" placeholder="套餐id"></el-input>
  </el-form-item>
  <el-form-item label="设备id" prop="deviceType">
      <el-input v-model="dataForm.deviceType" placeholder="设备id"></el-input>
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
import { useDeviceApi, useDeviceSubmitApi } from '@/api/meal/device'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	packageId: '',
	deviceType: '',
	createTime: '',
	updateTime: '',
	deleted: ''})

const init = (id?: number) => {
	if (id) {
		getDevice(id)
	}
}

const getDevice = (id: number) => {
	useDeviceApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	packageId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	deviceType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useDeviceSubmitApi(dataForm).then(() => {
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
