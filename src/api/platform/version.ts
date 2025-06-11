import service from '@/utils/request'

export const useVersionApi = (id: number) => {
	return service.get('/new/platform/version/' + id)
}

export const useVersionSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/platform/version', dataForm)
	} else {
		return service.post('/new/platform/version', dataForm)
	}
}