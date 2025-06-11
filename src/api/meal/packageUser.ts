import service from '@/utils/request'

export const usePackageUserApi = (id: number) => {
	return service.get('/new/meal/packageUser/' + id)
}
// 新增：获取套餐名列表API
export const usePackageNameListApi = () => {
	return service.get('/new/meal/package/nameList')
}

export const usePackageUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/meal/packageUser', dataForm)
	} else {
		return service.post('/new/meal/packageUser', dataForm)
	}
}
