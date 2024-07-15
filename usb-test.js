import { getDeviceList } from "usb";

const devices = getDeviceList()

console.log(devices.filter(device => device.deviceDescriptor.idVendor === 7504))