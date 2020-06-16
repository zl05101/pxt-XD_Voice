/**
* makecode XD Voice Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

//% weight=20 color=#0855AA icon="\uf055" block="心点语音模块"
namespace XD_Voice{
    let volume = 30;
    let w_buf = pins.createBuffer(64);

    function sendPackage(cmd:number, feedBack:number, param:number[], paramLen:number):void{
        w_buf[0] = 0x7E;
        w_buf[1] = 0xFF;
        w_buf[2] = 0x0;
        w_buf[3] = cmd;
        let dataLen = 4;
        if (feedBack != 0xFF){
            w_buf[4] = feedBack;
            dataLen += 1;
            for(let i=0; i < paramLen; i++){
                w_buf[i+5] = param[i];
            }
        } else{
            for(let i=0; i < paramLen; i++){
                w_buf[i+4] = param[i];
            }
        }
        dataLen += paramLen;
        w_buf[2] = dataLen - 1;
        w_buf[dataLen] = 0xEF;
        dataLen += 1;

        let data_buf = pins.createBuffer(dataLen);
        for(let i=0; i < dataLen; i++){
            data_buf[i] = w_buf[i];
        }
        serial.writeBuffer(data_buf);
    }

    /**
     * 语音模块初始化串口引脚
     * @param tx serial tx pin
     * @param rx serial rx pin
     */
    //% blockId="XD_Voice_begin" block="语音模块初始化串口引脚 TX $tx RX $rx"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function begin(tx:SerialPin, rx:SerialPin):void{
        serial.redirect( tx, rx, BaudRate.BaudRate9600);
    }

    /**
     * 语音模块播放
     * @param list 文件名组合
     */
    //% blockId="XD_Voice_play" block="语音模块播放 文件 $list"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function play(list:number[]):void{
        if(list.length > 2){
            sendPackage(0x21, 0xFF, list, list.length);
        }else{
            sendPackage(0xF, 0, list, list.length);
        }
    }

}

