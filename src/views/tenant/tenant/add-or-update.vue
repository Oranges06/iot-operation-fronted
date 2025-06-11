<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="dataForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="realName">
				<el-input v-model="dataForm.realName" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<el-input v-model="dataForm.avatar" placeholder="头像"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<ma-dict-select v-model="dataForm.gender" dict-type="user_gender" placeholder="性别   0：男   1：女   2：未知"></ma-dict-select>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="mobile">
				<el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="超级管理员" prop="superAdmin">
				<ma-dict-select v-model="dataForm.superAdmin" dict-type="user_super_admin" placeholder="超级管理员   0：否   1：是"></ma-dict-select>
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
import { useTenantApi, useTenantSubmitApi } from '@/api/tenant/tenant'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	username: '',
	password: '',
	realName: '',
	avatar: '',
	gender: '',
	email: '',
	mobile: '',
	orgId: '',
	superAdmin: '',
	status: '',
	tenantId: '',
	version: '',
	deleted: '',
	creator: '',
	createTime: '',
	updater: '',
	updateTime: ''
})

const init = (id?: number) => {
	if (id) {
		getTenant(id)
	}
}

const getTenant = (id: number) => {
	useTenantApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	username: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	password: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	realName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	gender: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	email: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mobile: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	orgId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	superAdmin: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	tenantId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		useTenantSubmitApi(dataForm).then(() => {
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
