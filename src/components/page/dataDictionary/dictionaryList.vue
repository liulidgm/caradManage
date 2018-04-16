<template>
    <div class="dictionary">
     <div class="search_area clear">
		<div class="s_input clear">
			<label>分类</label>
			<el-select v-model="dicType" placeholder="请选择">
                <el-option value="" label="全部" selected></el-option>
				<el-option v-for="item in typeList"  :value="item" :label="item"></el-option>
			</el-select>
		</div>
		<div class="s_input clear"><label>分类名称</label><el-input v-model="dicName" placeholder=""></el-input></div>
        <div class="s_btn_area" style="margin-top:10px;">
            <el-button type="primary" @click="searchDicList()">查询</el-button>
        </div>
	</div>
    <div style="margin-top:20px;">
        <el-button type="primary" @click="editDic()">新增</el-button>
    </div>
    <div style="margin-top:20px;">
        <label>分类(选择分类后可编辑或删除)&nbsp;&nbsp;</label>
        <el-select placeholder="请选择" v-model="tmplType" filterable>
            <el-option v-for="item in typeListEdit"  :value="item" :label="item"></el-option>
        </el-select>
        <el-button type="primary" @click="editType()">编辑</el-button>
        <el-button type="danger" @click="delType()">删除</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="dialogFormVisible"  width="30%" center>
        <el-form :model="dicForm">
            <el-form-item label="分类" :label-width="formLabelWidth">
              <el-select v-model="dicForm.classification" filterable allow-create placeholder="请选择或输入新增分类">
                <el-option v-for="item in typeList"  :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="dicForm.classificationName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="dicForm.classificationContent"></el-input>
            </el-form-item>
            
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit('dicForm')">取 消</el-button>
        <el-button type="primary" @click="confimEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="editTypeVisible"  width="30%" center>
        <el-form :model="dicForm">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="tmplType" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="新名称" :label-width="formLabelWidth">
              <el-input v-model="newTypeName" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditType()">取 消</el-button>
        <el-button type="primary" @click="confimEditType()">确 定</el-button>
      </span>
    </el-dialog>

    <div class="dataBox" style="margin-top:20px">
        <el-table :data="dicList"  border style="width: 100%">
             <el-table-column
              type="index"
              :index="indexMethod"
              width="80">
            </el-table-column>
            <el-table-column
                prop="dictionaryId"
                v-if="false">
            </el-table-column>
            <el-table-column
              prop="classification"
              label="分类">
            </el-table-column>
            <el-table-column
              prop="classificationName"
              label="分类名称">
            </el-table-column>
            <el-table-column
              prop="classificationContent"
              label="备注">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template scope="scope">
                <el-button size="small" type="primary" @click="editDictionary(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delDictionaryName(scope.row)">删除</el-button>
              </template>
            </el-table-column>
           
        </el-table>
        <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="dicCnt"
                @current-change="dicListPageChange">
              </el-pagination>
        </div>
    </div>
    <el-dialog title="提示" :visible.sync="editDictionaryVisible"  width="30%" center>
        <el-form :model="dicForm">
            <el-form-item label="分类" :label-width="formLabelWidth">
              <el-input v-model="dicForm.classification" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="dicForm.classificationName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="dicForm.classificationContent"></el-input>
            </el-form-item>
            
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditDictionary()">取 消</el-button>
        <el-button type="primary" @click="confirmEditDictionary()">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script type="text/javascript">
import {dictionaryList,addDictionary,delDictionary,updDictionary,editDictionary,delDictionaryName} from 'service/getData'
    export default {
        data(){
            return{
                dicList:[],
                typeList:[],
                typeListEdit:[],
                dicCnt:0,
                dicType:'',
                dicName:'',
                curPage:1,
                dicForm:{
                    classification:'',
                    classificationName:'',
                    classificationContent:''
                },
                dialogFormVisible: false,
                editTypeVisible:false,
                editDictionaryVisible:false,
                formLabelWidth: '80px',
                tmplType:'',
                newTypeName:''
            }
        },
        mounted(){
            this.getDicList(1,'','');
        },
        methods:{
            dicListPageChange(val){
                this.curPage = val;
                this.getDicList(val,this.dicType,this.dicName);
            },
        	getDicList(curPage,classification,classificationName){
        		dictionaryList(curPage,classification,classificationName).then(res=>{
        			console.log(res);
                    if(res.code=="000"){
                        this.dicCnt = res.dictionaryCnt;
                        this.curPage = res.backCurPage;
                        this.dicList = res.dictionaries;
                        this.typeList = res.dictionaryList;
                        this.typeListEdit = res.dictionaryList;
                    }
        		})
        	},
            indexMethod(index){
                console.log("--------------------------");
                console.log(this.curPage);
                return (index+1)+(this.curPage-1)*10;
            },
            searchDicList(){
                this.getDicList(1,this.dicType,this.dicName);
            },
            editDic(){
               this.dialogFormVisible = true;
                
            },
            confimEdit(){
                //addDictionary
                addDictionary(this.dicForm).then(res=>{
                    console.log(res);
                    if(res.code=="000"){
                        this.dialogFormVisible = false;
                        this.getDicList(1,'','');
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                    }else{
                        this.$message.error('添加失败');
                    }

                })
            },
            cancelEdit(formName){
                this.dialogFormVisible = false;
                this.dicForm.f_name = '';
                this.dicForm.f_type = '';
                // this.$refs[this.dicForm].resetFields();
                // this.$nextTick(function() {
                //   this.$refs[formName].resetFields();
                // })
                // this.$refs[formName].resetFields();
            },
            editType(){
                if(this.tmplType==''){
                    this.$message({
                      message: '请选择一个分类！',
                      type: 'warning'
                    });
                }else{
                    this.editTypeVisible = true;
                }
                
            },
            confimEditType(){
                updDictionary(this.tmplType,this.newTypeName).then(res=>{
                    if(res.code=='000'){
                        this.editTypeVisible = false;
                        this.tmplType='';
                        this.getDicList(1,'','');
                    }else{
                       this.$message.error(res.msg) 
                    }
                })
            },
            cancelEditType(){
                this.editTypeVisible = false;
                this.newTypeName='';
            },
            delType(){
                //delDictionary
                if(this.tmplType==''){
                    this.$message({
                      message: '请选择一个分类！',
                      type: 'warning'
                    });
                }else{
                   this.$confirm('确定删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        delDictionary(this.tmplType).then(res=>{
                            if(res.code=='000'){
                                this.tmplType='';
                                this.getDicList(1,'','');
                            }else{
                                this.$message.error(res.msg)
                            }
                        })
                    }).catch(() => {
                    });
                }
                
            },
            editDictionary(row){
                this.dicForm.classification=row.classification;
                this.dicForm.classificationName=row.classificationName;
                this.dicForm.classificationContent=row.classificationContent;
                this.dicForm.dictionaryId = row.dictionaryId;
                this.editDictionaryVisible = true;

            },
            confirmEditDictionary(){
                editDictionary(this.dicForm).then(res=>{
                    if(res.code=='000'){
                        this.editDictionaryVisible = false;
                        this.$message.success('操作成功');
                        this.getDicList(this.curPage,this.dicType,this.dicName);
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            cancelEditDictionary(){
                this.dicForm.classification='';
                this.dicForm.classificationName='';
                this.dicForm.classificationContent='';
                this.editDictionaryVisible = false;
            },
            delDictionaryName(row){
                this.$confirm('确定删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    delDictionaryName(row.dictionaryId).then(res=>{
                        console.log(res);
                        if(res.code=='000'){
                            this.getDicList(this.curPage,this.dicType,this.dicName);
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                });
            }
        }
    }
</script>
<style type="text/css">
    
</style>