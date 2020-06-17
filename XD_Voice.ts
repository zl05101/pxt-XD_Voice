/**
* makecode XD Voice Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

//% weight=20 color=#0855AA icon="\uf088" block="心点语音模块"
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
     * 音量设置
     * @param vol
     */
    //% blockId="XD_Voice_volumeSet" block="音量设置 $vol"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function volumeSet(vol:number):void{
        volume = vol
        if (volume > 30){
            volume = 30
        }
        if (volume < 0){
            volume = 0
        }
        let temp:number[] = [0x0, 0x0];
        temp[1] = volume;
        sendPackage(0x6, 0, temp, temp.length);
    }

    /**
     * 音量增大
     * @param vol
     */
    //% blockId="XD_Voice_volumeUp" block="音量增大"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function volumeUp():void{
        if (volume < 30){
            volume++;
        }
        volumeSet(volume);
    }

    /**
     * 音量减小
     * @param vol
     */
    //% blockId="XD_Voice_volumeDown" block="音量减小"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function volumeDown():void{
    if (volume > 0){
            volume--;
        }
        volumeSet(volume);
    }

    /**
     * 复位
     * @param vol
     */
    //% blockId="XD_Voice_reset" block="复位"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function reset():void{
        let temp:number[] = [0x0, 0x0];
        sendPackage(0x0C, 0, temp, temp.length);
    }

    /**
     * 播放下一曲
     * @param vol
     */
    //% blockId="XD_Voice_nextSong" block="播放下一曲"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function playNextSong():void{
        let temp:number[] = [0x0, 0x0];
        sendPackage(0x01, 0, temp, temp.length);
    }

    /**
     * 播放上一曲
     * @param vol
     */
    //% blockId="XD_Voice_lastSong" block="播放上一曲"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function playLastSong():void{
        let temp:number[] = [0x0, 0x0];
        sendPackage(0x02, 0, temp, temp.length);
    }

    function checkStatus():void{
        let temp:number[] = [0x0, 0x0];
        sendPackage(0x42, 0, temp, temp.length);
    }

    /**
     * 播放忙
     * @param vol
     */
    //% blockId="XD_Voice_busy" block="播放忙"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function busy():boolean{
        let r_buf = pins.createBuffer(10);
        pause(100);
        checkStatus();
        pause(100);
        r_buf = serial.readBuffer(10);
        if (r_buf[0] == 0x7E && r_buf[1] == 0xFF && r_buf[2] == 0x06 && r_buf[3] == 0x42){
            if(r_buf[6] == 0x1)
                return true
            else
                return false
        } else{
            return true
        }
    }

    /**
     * 语音模块播放
     * @param list 文件名组合
     */
    //% blockId="XD_Voice_play" block="语音模块播放 文件 $list"
    //% weight=70 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function play(list:number[]=[1,1]):void{
        if(list.length > 2){
            sendPackage(0x21, 0xFF, list, list.length);
        }else{
            sendPackage(0xF, 0, list, list.length);
        }
    }

    /**
     * 语音模块初始化串口引脚
     * @param tx serial tx pin
     * @param rx serial rx pin
     */
    //% blockId="XD_Voice_begin" block="语音模块初始化串口引脚 TX $tx RX $rx"
    //% weight=100 blockGap=8
    //% parts=XD_Vocie trackArgs=0
    export function begin(tx:SerialPin=P15, rx:SerialPin=P16):void{
        serial.redirect( tx, rx, BaudRate.BaudRate9600);
    }
}

