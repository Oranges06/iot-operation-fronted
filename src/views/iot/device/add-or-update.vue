<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
			<el-form-item label="设备id" prop="deviceId">
				<el-input v-model="dataForm.deviceId" placeholder="设备id"></el-input>
			</el-form-item>
			<el-form-item label="设备名称" prop="name">
				<el-input v-model="dataForm.name" placeholder="设备名称"></el-input>
			</el-form-item>
			<el-form-item label="类型" prop="type">
				<el-input v-model="dataForm.type" placeholder="类型 1 灯 2 风扇 3 蜂鸣器  4 温湿度传感器 5 人体红外传感器 6 光敏传感器"></el-input>
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
import { useDeviceApi, useDeviceSubmitApi } from '@/api/iot/device'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	deviceId: '',
	name: '',
	type: '',
	isSwitched: '',
	status: '',
	temperature: '',
	humidity: '',
	tenantId: '',
	adminId: '',
	createTime: '',
	updateTime: '',
	deleted: ''
})

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
	deviceId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	type: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

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
