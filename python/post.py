'''
import requests
url = 'http://localhost:3300/banner'
r = requests.get(url).json()
print(r)
print("-------------------")
print(r['banners'])
print(r['code'])
'''

import requests
getlist = [
    {
        'url': 'search/suggest',
        'params': {
            'keywords': 'hh'
        }
    },
    {
        'url': 'banner',
        "params": {}
    }
]
postList = [
    {
        'url': 'search',
        'data': {
            'keywords': 'hh'
        }
    }
]
url = 'http://localhost:3300/'
def unitTest(dict, method):
    if (method == 'get'):
        for item in dict:
            response = requests.get(url + item['url'], item['params']).json()
            assert response['code'] == 200
            # print(item['method'], item['url'], item['params'])
            # response = requests[item['method']]((url + item['url'], item['params'])).json()
            # print(response)
    else:
        for item in dict:
            response = requests.post(url + item['url'], item['data']).json()
            assert response['code'] == 200
unitTest(getlist, 'get')
unitTest(postList, 'post')

# dict = {'a': 1, 'b': 2, 'b': '3'}
# print(dict['b'])

'''
1. 定义多个 list ，每个list存放不同 请求方法(method) 的接口集合，
    然后定义一个函数根据不同的方法，路径，参数区分别请求接口，再对结果进行校验，比如code=200，某些字段 是否有数据正常返回
    
2. 保证版本迭代时如果接口发生更改，可以及时发现，进行迭代 === 版本控制
'''