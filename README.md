# �ĵ�Ƽ�����ģ��

makcode��չ��  

Author: lz

Date:   2020.Mar  

![](voice.png)  
  

## �����չ

��makecode��̽��棬ѡ����չ��ճ�����µ�ַ��

https://github.com/zl05101/pxt-XD_Voice

�����Ӽ���

## �����÷�

```
input.onButtonPressed(Button.A, function () {
    XD_Voice.play([1, 1])
})
XD_Voice.begin(SerialPin.P15, SerialPin.P16)
```

## API�ӿ�

- **begin(tx:SerialPin, rx:SerialPin)**  
����ģ���ô���ͨѶ���˽ӿ����ô�������
  - tx: ����TX����
  - rx: ����RX����

- **play(list:number[])**  
���������ļ�
  - list: Ҫ���ŵ��ļ�����������Ϊ���顣��һ��Ԫ��Ϊ�ļ������֣��ڶ���Ԫ���Ǵ��ļ����µ��ļ�����������ϲ�������ļ���
��������Ϊ[1,1]��ʾ����01�ļ������ļ���Ϊ01�������ļ���[1,1,1,2,2,3]��ʾ��ϲ����ļ���01����01�ļ���01�ļ�����02�ļ���02�ļ�����03�ļ���

  - ע�⣺����Ԫ�صĸ���һ����ż������������������������޷�������

- **volumeSet(vol:number)**  
��������

  - vol: ����ֵ����Χ:0-30

- **reset()**  
��λ

- **busy()**  
�ж��ǲ����ڲ����У�����true���ʾ�ڲ�����false��ʾ���С�

## Demo

![](demo.png)  



## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  

## ֧������

* for PXT/microbit


[From microbit/micropython Chinese community](http://www.micropython.org.cn)
