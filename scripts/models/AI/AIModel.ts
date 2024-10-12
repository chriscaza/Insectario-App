import { TensorflowModel, TensorflowPlugin, useTensorflowModel } from 'react-native-fast-tflite'

const model = useTensorflowModel(require('@/assets/models/best.tflite'))
export const actualModel = model.state === 'loaded' ? model.model : undefined

export const loadModel = (): string => {
    if (actualModel == null) return 'Error al cargar el modelo'
    return (`Modelo cargado\n Shape: ${modelToString(actualModel)} \nModel: ${model.state} ${model.model != null}`)

}

const modelToString = (model: TensorflowModel): string => {
    if(!model) return 'No model loaded'

    const inputDetails = model.inputs ? model.inputs : 'No inputs details'
    const outputDetails = model.outputs ? model.outputs : 'No outputs details'

    return `
    Input Shape: ${JSON.stringify(inputDetails)}
    Output Shape: ${JSON.stringify(outputDetails)}`
}

