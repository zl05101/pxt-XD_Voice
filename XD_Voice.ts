/**
* makecode XD Voice Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

//% weight=20 color=#0855AA icon="\uf055" block="心点语音"
namespace XD_Voice{
    let volume = 30;

    function uartSendData(buf:number[]):void{
        serial.writeNumbers(buf);
    }

    function sendPackage(cmd:number, feedBack:number, param:number[], paramLen:number):void{
        let buf:number[] = [0x7E, 0xFF, 0x0];
        buf.push(cmd);
        let dataLen = 4;
        if (feedBack != 0xFF){
            buf.push(feedBack);
            dataLen += 1;
            for(let i=0; i < paramLen; i++){
                buf.push(param[i])
            }
        } else{
            for(let i=0; i < paramLen; i++){
                buf.push(param[i])
            }
        }
        dataLen += paramLen;
        buf[2] = dataLen - 1;
        buf.push(0xEF);
        uartSendData(buf);
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
     * @param folder 文件夹名
     * @param file   文件名
     */
    //% blockId="XD_Voice_play" block="语音模块播放单个文件"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function playByName():void{
        let na = [1, 1];
        sendPackage(0xF, 0, na, 2);
    }

}

