import service from '@/utils/request'

export const useTenantApi = (id: number) => {
	return service.get('/new/new/tenant/' + id)
}

export const useTenantSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/new/tenant', dataForm)
	} else {
		return service.post('/new/new/tenant', dataForm)
	}
}
