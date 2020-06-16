/**
* makecode XD Voice Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

//% weight=20 color=#0855AA icon="\uf055" block="心点语音"
namespace XD_Voice{
    let volume = 30;

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
}
