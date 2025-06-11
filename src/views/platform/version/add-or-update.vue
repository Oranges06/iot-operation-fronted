<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="版本名称" prop="versionName">
      <el-input v-model="dataForm.versionName" placeholder="版本名称，如0.0.1"></el-input>
  </el-form-item>
  <el-form-item label="版本号" prop="versionCode">
      <el-input v-model="dataForm.versionCode" placeholder="版本号，用于比较更新"></el-input>
  </el-form-item>
  <el-form-item label="发布类型" prop="releaseType">
      <el-input v-model="dataForm.releaseType" placeholder="发布类型，如正式版/开发版/远程调试/热更新"></el-input>
  </el-form-item>
  <el-form-item label="包类型" prop="packageType">
      <el-input v-model="dataForm.packageType" placeholder="包类型，如APK/AAB"></el-input>
  </el-form-item>
  <el-form-item label="下载地址" prop="downloadUrl">
      <el-input v-model="dataForm.downloadUrl" placeholder="下载地址"></el-input>
  </el-form-item>
  <el-form-item label="版本说明" prop="releaseNote">
      <el-input v-model="dataForm.releaseNote" placeholder="版本说明"></el-input>
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
import { useVersionApi, useVersionSubmitApi } from '@/api/platform/version'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	versionName: '',
	versionCode: '',
	releaseType: '',
	packageType: '',
	downloadUrl: '',
	releaseNote: '',
	createTime: '',
	updateTime: '',
	deleted: ''})

const init = (id?: number) => {
	if (id) {
		getVersion(id)
	}
}

const getVersion = (id: number) => {
	useVersionApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	versionName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	versionCode: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	releaseType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	packageType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	downloadUrl: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	releaseNote: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useVersionSubmitApi(dataForm).then(() => {
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
