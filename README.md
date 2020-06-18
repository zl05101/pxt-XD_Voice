# Xindkj Voice

makecode xindkj voice module extension for micro:bit.  

Author: lz
Date:   2020.Mar  

![](voice.png)  
  

## Add extension

open your microbit makecode project, in Extension, paste  

https://github.com/zl05101/pxt-XD_Voice

to search box then search, and click to add.  

## Basic usage

```
input.onButtonPressed(Button.A, function () {
    XD_Voice.play([1, 1])
})
XD_Voice.begin(SerialPin.P15, SerialPin.P16)
```

## API

- **begin(tx:SerialPin, rx:SerialPin)**  
initialize voice module.
tx: serial tx pin
rx: serial rx pin

- **play(list:number[])**  
play voice
list: folder name and file name

- **volumeSet(vol:number)**  
set voice volume
vol: volume value rang:0-30

- **reset()**  
voice module reset

- **busy()**  
check voice play busy

## Demo

![](demo.png)  



## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  

## Supported targets

* for PXT/microbit


[From microbit/micropython Chinese community](http://www.micropython.org.cn)
