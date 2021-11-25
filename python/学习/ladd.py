# nums = [2,7,11,15]
# n = len(nums)
# for i in range(n):
#     print(nums[i])
#     for j in range(i+1,n):
#         print(nums[i], nums[j])


# def juage():
#     for n in range(10, 13):
#         if (n % 2 == 1):
#             san(n)

# def san(n):
#     for i in range(n):
#         for c in range(i+1):
#             print('*', end = ' ')
#         print()
    
# juage()


# def san(n):
#     for i in range(n):
#         for c in range(i+1):
#             print('*', end = ' ')
#         print()
    

# for n in range(10, 20):
#     if (n % 2 == 1):
#         san(n)

nums = [3,0,1,4,2,6]
n = len(nums)+1
a = 0
for i in range(n):
    a = a+i

s = sum(nums)
print(a-s)


