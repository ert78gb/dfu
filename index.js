import { SerialPort } from 'serialport'


const devices = await SerialPort.list()

const device = devices.find(x => x.vendorId?.toLowerCase() === '1d50' && x.productId?.toLowerCase() === '6125')

if (!device) {
  console.error("Can't find device")
  process.exit(1)
}
console.log(device)
const serialPort = new SerialPort({
  path: device.path,
  baudRate: 115200,
  autoOpen: false,
})

serialPort.open((err) => {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }

  console.log('port opened')

  serialPort.close((err) => {
    if (err) {
      return console.log('Error closing port: ', err.message)
    }
  })
})
