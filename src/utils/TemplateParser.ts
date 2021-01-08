const doc = `
    <div style="padding:0px 15px 25px 15px;">
        <h4 style="font-family: 微软雅黑;font-weight:bold;">🔹🔷上周计划：🔷🔹</h4>
        <div style="padding: 0px 25px;margin-top: 15px;">
            <div style="margin: 10px 0px">
                <label>🔹Jtarc：</label>
                {{#each lastWeekJtracList}}
                    <div style="padding: 0px 25px;">
                        <label>※{{jtracPlan}}</label>
                        {{#if IDCFlag}}
                        <input type="radio" name="lastJtracPlanRadio{{@index}}">IDC
                        {{/if}}
                        {{#if csFlag}}
                        <input type="radio" name="lastJtracPlanRadio{{@index}}">45
                        {{/if}}
                    </div>
                {{/each}}
            </div>
            <div style="margin: 10px 0px">
                <label>🔹MPH5：</label>
                {{#each lastWeekMPH5List}}
                    <div style="padding: 0px 25px;">
                        <label>※{{MPH5Plan}}</label>
                        {{#if IDCFlag}}
                        <input type="radio" name="lastMPH5PlanRadio{{@index}}">IDC
                        {{/if}}
                        {{#if csFlag}}
                        <input type="radio" name="lastMPH5PlanRadio{{@index}}">45
                        {{/if}}
                    </div>
                {{/each}}
            </div>
            <div style="margin: 10px 0px">
                <label>🔹技术学习：</label>
                <div style="padding: 0px 25px;">
                    <label>※{{lastNewTecPlan}}</label>
                </div>
            </div>
        </div>


        <h4 style="font-family: 微软雅黑;font-weight:bold;">🔸🔶下周计划：🔶🔸</h4>
        <div style="padding: 0px 25px;margin-top: 15px;">
            <div style="margin: 10px 0px">
                <label>🔸Jtarc：</label>
                {{#each nextWeekJtracList}}
                    <div style="padding: 0px 25px;">
                        <label>※{{jtracPlan}}</label>
                        {{#if IDCFlag}}
                        <input type="radio" name="nextJtracPlanRadio{{@index}}">IDC
                        {{/if}}
                        {{#if csFlag}}
                        <input type="radio" name="nextJtracPlanRadio{{@index}}">45
                        {{/if}}
                    </div>
                {{/each}}
            </div>
            <div style="margin: 10px 0px">
                <label>🔸MPH5：</label>
                {{#each lastWeekMPH5List}}
                    <div style="padding: 0px 25px;">
                        <label>※{{MPH5Plan}}</label>
                        {{#if IDCFlag}}
                        <input type="radio" name="nextMPH5PlanRadio{{@index}}">IDC
                        {{/if}}
                        {{#if csFlag}}
                        <input type="radio" name="nextMPH5PlanRadio{{@index}}">45
                        {{/if}}
                    </div>
                {{/each}}
            </div>
            <div style="margin: 10px 0px">
                <label>🔸技术学习：</label>
                <div style="padding: 0px 25px;">
                    <label>※{{nextNewTecPlan}}</label>
                </div>
            </div>
        </div>

        <div style="font-size: 14px;color: #ff6633;">
            <div style="font-weight: bold;margin: 4px 0px;">📌格式说明：</div>
            *jtracPlan - jtrac号+开发内容摘要+计划进度+实际进度 <br/>
            *MPH5Plan - 编号+内容摘要+具体进行内容|未进行理由+当前进度 <br/>
        </div>
    </div>
` 

let obj = {
    lastWeekJtracList:[
        {jtracPlan:'Mall-742 PC版快递鸟100% 完成',IDCFlag:false,csFlag:true},
        {jtracPlan:'V2A-10010 DW&DL增加下载记录100% 未完成',IDCFlag:true,csFlag:false},
        {jtracPlan:'V2A-10002 GERP菜单协助50% 完成',IDCFlag:false,csFlag:false}
    ],
    lastWeekMPH5List:[{MPH5Plan:'6-9 下拉框展开宽度调整 未进行',IDCFlag:false,csFlag:false}],
    lastNewTecPlan:'React技术分享PPT整理 未完成 当前进度50%',
    nextWeekJtracList:[{jtracPlan:'V2A-10002 GERP菜单协助100%'}],
    nextWeekMPH5List:[{MPH5Plan:''}],
    nextNewTecPlan:'React技术分享PPT整理',
};

let jsonString = JSON.stringify(obj);
let mapModule:Map<string, string> = null;
let objAcFragment = [];
let output = '';

export function templateParser(mode:string = 'input', template: string = doc, json?:string){
  objAcFragment = registerFragment(template);
  if(mode == 'input'){
  	output = inputModeParser();
  }else if(mode == 'show'){
  	output = showModeParser(json);
  }
  return output;
}

function registerFragment(input: string){
	var moduleTag = /[^{}]+|{{(#|\/|@)?([^{}]+)}}/g;
    var fragment;
    var objFragment = {type:'',keyword:'',para:'',content:''};
    var objAcFragment = [];
    while(( fragment = moduleTag.exec(input) )){
        objFragment = {type:'',keyword:'',para:'',content:''};
        if(fragment[1] === undefined && fragment[2] === undefined){
            //html文本片段
            objFragment.type = 'text';
        }else if(fragment[1] === undefined && fragment[2] !== undefined){
            //{{参数片段}}
            objFragment.type = 'para';
            objFragment.para = fragment[2];
        }else if(fragment[1] !== undefined && fragment[2] !== undefined){
            //{{#|/|@逻辑结构片段}}
            objFragment.type = 'keyword';
            objFragment.keyword = fragment[1] + fragment[2].split(' ')[0];
            objFragment.para = fragment[2].split(' ')[1];
        }
        objFragment.content = fragment[0];
        objAcFragment.push(objFragment);
    }
	return objAcFragment;
}

function inputModeParser(){
	let result = '';
    let index = 0;
	for(var i = 0; i < objAcFragment.length; i++){
        if(objAcFragment[i].type == 'text'){
            result += objAcFragment[i].content;
        }else if(objAcFragment[i].type == 'para'){
            result += '<input name="' + objAcFragment[i].para + '" style="width: 260px;height: 24px;margin: 5px 2px 0px 2px;border: 1px solid #bfbfbf;" type="text" placeholder="' + objAcFragment[i].para + '"/>';
        }
        else if(objAcFragment[i].type == 'keyword'){
            if(objAcFragment[i].keyword === '#each'){
                index = 0;
                result += '<button name="btnAddItem" style="cursor:pointer;border:1px solid #f0360f;color: #FFFFFF;font-size: 12px;font-family: 微软雅黑;background-color: #f85b38;float: right">＋ 添加 </button>';
            }else if(objAcFragment[i].keyword === '#if'){
                
            }else if(objAcFragment[i].keyword === '@index'){
                result += index;
            }
        }
    }
	return result;
}

function showModeParser(json:string){
	let result = '';
	for(var i = 0; i < objAcFragment.length; i++){
		if(objAcFragment[i].type == 'text'){

		}else if(objAcFragment[i].type == 'para'){

		}
		else if(objAcFragment[i].type == 'keyword'){
			
		}
	}
	return result;
}

 
