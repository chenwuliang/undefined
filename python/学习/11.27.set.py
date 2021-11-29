
'''
判定字符是否唯一: https://leetcode-cn.com/problems/is-unique-lcci/submissions/
字典用法: https://www.runoob.com/python/python-dictionary.html
'''

class Solution:
    def isUnique(self, astr: str) -> bool:
        for index, str in enumerate(astr):
            for j, str2 in enumerate(astr[index+1:]):
                if str == str2:
                    return False
        return True
        # 双层循环

    def isUnique2(self, astr: str) -> bool:
        if len(astr) == len(set(astr)):
            return True
        else:
            return False
        # 利用set

    def isUnique3(self, astr: str) -> bool:
        dict = {}
        for s in astr:
            if dict.get(s):
                dict[s] = dict[s] + 1
            else:
                dict[s] = 1
        maxvz = max(dict.values())
        res = []
        for y in dict:
            if dict[y] == maxvz:
                res.append({y: dict[y]})
        return res


        # 利用dict

solution = Solution()

a = solution.isUnique3('aabbcccccddeefffff')
print(a)

# dict = {}
# print(dict.get('a'))
# dict['a'] = 1
# print(dict.get('a'))
# '''
# dict = {
#     a: 1
# }
# '''
# print(dict)