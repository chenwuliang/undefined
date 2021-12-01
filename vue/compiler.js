
const { compile } = require("vue-template-compiler");

const template = `
<templatde>
    <div>
        <div v-for="(item, index) in 10" v-if='index % 2 === 0'>{{item}}</div>
        <div  v-else-if='index % 3 === 0'>{{item}}</div>
        <div  v-else>{{item}}</div>
    </div>
</template>
`;

const res = compile(template);
console.log(res.render);

/**

`
'with(this){return 
    _c(
        'div',
        _l((10),
        function(item,index){
            return (index % 2 === 0)
                ?_c('div',[_v(_s(item))])
                :(index % 3 === 0)
                    ?_c('div',[_v(_s(item))])
                    :_c('div',[_v(_s(item))])
        }),
        0
    )
}'
`;

 */

