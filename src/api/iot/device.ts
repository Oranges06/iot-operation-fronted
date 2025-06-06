import service from '@/utils/request'

export const useDeviceApi = (id: number) => {
	return service.get('/new/iot/device/' + id)
}

export const useDeviceSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/iot/device', dataForm)
	} else {
		return service.post('/new/iot/device', dataForm)
	}
}
