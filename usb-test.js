import { WebUSB } from 'usb'
import { inspect } from 'node:util'

const DFU_REQUESTS = Object.freeze({
  DFU_DETACH: 0,
  DFU_DNLOAD: 1,
  DFU_UPLOAD: 2,
  DFU_GETSTATUS: 3,
  DFU_CLRSTATUS: 4,
  DFU_GETSTATE: 5,
  DFU_ABORT: 6
})

const customWebUSB = new WebUSB({
  allowAllDevices: true
})

const devices = await customWebUSB.getDevices()

const device = devices.find(webUsbDevice => {
  const { idVendor, bcdUSB } = webUsbDevice.device.deviceDescriptor

  return idVendor === 7504 && bcdUSB === 0x200
})

console.log(inspect(device, { depth: 20 }))

await device.open()

const response = await device.controlTransferIn(
  {
    index: 1,
    requestType: 'class',
    recipient: 'interface',
    request: DFU_REQUESTS.DFU_DNLOAD,
    value: 0
  },
  1
)

console.log(inspect(response, {depth: 20}))

await device.close()
