import base64,requests,time,os
from PIL import Image
import pytesseract
"""
pip install pytesseract
pip install pillow


vscode 环境使用时 注意python版本与下载时一致
brew 下载时注意下载源
"""

# Host
host = 'http://192.168.1.2:3000/'
def apiFactory(url):
    return host + url

img_dir = '/img/'
# 用户密码

# 接口地址
code_api = apiFactory('json')
anjuke_api = 'https://login.anjuke.com/general/captcha?timestamp=123'

# Header 
self_default_header = {
    'Accept':'application/json, text/plain, */*',
    'Content-Type':'application/json;charset=UTF-8'
}

def getBase64Code():
    yanz_rep = requests.get(anjuke_api)
    return yanz_rep
    

def base64CodeToImage(base64Code, imageName = 'code.jpeg'):
    """
    功能: base64格式转图片, 保存到当前目录 code.png
    参数: 
        base64Code: base64 编码格式字符串
        imageName: 要保存为图片的名称
    返回:
        图片二进制数据
    """
    # base64Code 接收的 base64编码格式的字符串 
    # 默认图片名称 code.png
    imagedata = base64.b64decode(base64Code) # 转成2进制
    saveImage(imagedata, imageName)
    return imagedata # 返回二进制数据，不用写入文件 ocr扫描时候可以直接用这个，然后把上面三行注释了

def saveImage(imagedata, imageName):
    if not os.path.exists(img_dir):
        os.mkdir(img_dir)
    file = open(imageName, 'wb') # wb 写入文件的一种格式 我也不知道
    file.write(imagedata) # 写入文件
    file.close() # 关闭读写通道

def parseCode(image_name = 'code.png'):
    '''
    读取本地图片
    ocr识别图片
    返回: 验证码识别结果
    '''
    img = Image.open(os.getcwd() + img_dir  + image_name)
    result = pytesseract.image_to_string(img)
    print(image_name.split('.')[0] + ' result: ' + result)
    return result

def begin():
    code_response = getBase64Code() # 验证码响应数据

    # 处理图片，base64转二进制，本地存储
    # base64CodeToImage(code_response['img']) # 图片二进制数据
    name = 'img/code' + str(time.time()) + '.png'
    saveImage(code_response, name)

    # 识别图片返回识别结果
    parseCode(name) # 图片二维码结果 code 


parseCode('code.jpeg')
parseCode('7364.jpeg')
parseCode('10.jpeg')
parseCode('python3webspider.png')

# begin()
