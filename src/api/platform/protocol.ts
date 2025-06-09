import service from '@/utils/request'

export const useProtocolApi = (id: number) => {
	return service.get('/new/platform/protocol/' + id)
}

export const useProtocolSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/platform/protocol', dataForm)
	} else {
		return service.post('/new/platform/protocol', dataForm)
	}
}