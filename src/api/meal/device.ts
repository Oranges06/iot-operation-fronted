import service from '@/utils/request'

export const useDeviceApi = (id: number) => {
	return service.get('/meal/device/' + id)
}

export const useDeviceSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/meal/device', dataForm)
	} else {
		return service.post('/new/meal/device', dataForm)
	}
}
