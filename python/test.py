'''
def bianl(mylist):
    mylist.append([10,20,30])
    print(mylist)
    return
mylist1 = [1]
mylist2 = [2]
bianl(mylist1)
bianl(mylist2)
  

def change(v,b):
    v = 10
    b = 11
    return v + b
str = 0
str2 = 9
print(change(str,str2))
#change(str2)
  '''
# def calculate(a, b):
#     sum = 0
#     r = a
#     while r<b:
#         r = r+1
#         sum = sum + r
#     return sum
# print(calculate())
def deli(a,b):
    sum = 0
    for i in range(a,b,2):
        sum = sum + i
        print(i)
    return sum
    
print(deli(10,20))



# ----------

data = {
    'code': 200,
    "data": "xixixi"
}
def printData(r, key):
    if (key in r) :
        print("----------------------")
        print("正在打印"+key)
        print(r[key])
    else :
        print("未发现"+key+"数据")

def add(a, b, c):
    return a + b + c 

number = add(3, 4, 5)
# print(number)
printData(data, 'code')
printData(data, 'data')
printData(data, 'fnejwk')

# printData(response, "code")
# printData(response, "result")
