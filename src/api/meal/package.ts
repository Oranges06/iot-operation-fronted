import service from '@/utils/request'

export const usePackageApi = (id: number) => {
	return service.get('/new/meal/package/' + id)
}

export const usePackageSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/new/meal/package', dataForm)
	} else {
		return service.post('/new/meal/package', dataForm)
	}
}
