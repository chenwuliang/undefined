import base64,requests,os
from PIL import Image
import pytesseract
"""
pip install pytesseract
pip install pillow
"""
# Host
host = 'http://192.168.1.2:3000/'
def apiFactory(url):
    return host + url

# 用户密码
username = 'username'
password = 'password'

# 接口地址
code_api = apiFactory('code')
login_api = apiFactory('login')
logout_api = apiFactory('logout')
code_api = apiFactory('json')

# Header 
self_default_header = {
    'Accept':'application/json, text/plain, */*',
    'Content-Type':'application/json;charset=UTF-8'
}


def getBase64Code():
    '''
    功能: 获取验证码
    参数: 
    返回:
        json数据
    '''
    yanz_rep = requests.get(code_api)
    data = yanz_rep.json()
    if (data['code'] == 200):
        return data
    else :
        # 如果接口没有正常返回 抛出异常
        raise '请求验证码失败'

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
    file = open(imageName, 'wb') # wb 写入文件的一种格式 我也不知道
    file.write(imagedata) # 写入文件
    file.close() # 关闭读写通道
    return imagedata # 返回二进制数据，不用写入文件 ocr扫描时候可以直接用这个，然后把上面三行注释了

def parseCode(image_name = 'code.png'):
    '''
    data: 图片二进制数据
    ocr识别图片
    返回: 验证码识别结果
    '''
    path = os.getcwd() + '/' + image_name
    img = Image.open(path)
    result = pytesseract.image_to_string(img)
    return codeToSum(result)

def codeToSum(code):
    sum = code.split('=')[0]

    def split(s):
        list = sum.split(s)
        return list

    if ('+' in sum):
        num = split('+')
        sum = int(num[0]) + int(num[1])
    elif ('-' in sum):
        num = split('-')
        sum = int(num[0]) - int(num[1])
    return sum

def logins():
    '''
    登录功能
    '''
    code_response = getBase64Code() # 验证码响应数据

    # 处理图片，base64转二进制，本地存储
    base64CodeToImage(code_response['img']) # 图片二进制数据

    # 识别图片返回识别结果
    code = parseCode('10.jpeg') # 图片二维码结果 code 

    uuid = code_response['uuid'] # uuid

    requests_params = {
        "username": username,
        "password": password,
        "code": code,
        "uuid": uuid
    }
    return 'token'
    

def create():
    url = apiFactory('create/')
    data = {
        "unitName": "1120导入测试",
    }
    requests.post(url=url,headers=self_default_header,json=data).json()

def logout():
    requests.delete(url=logout_api,headers=self_default_header)


def begin():
    token = logins()
    print('获取token:' + token)
    self_default_header['Authorization'] = 'Bearer '+ token

    if (token):
        create()
        logout()


parseCode('code.jpeg')
parseCode('7364.jpeg')
parseCode('10.jpeg')
parseCode('python3webspider.png')
