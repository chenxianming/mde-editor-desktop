import React from 'react';
import Icon from './icons';

import { Scrollbars } from 'react-custom-scrollbars';

import localSync from '../utils/localsync';

class NewDoc extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        
        this.newDoc = this.newDoc.bind( this );
    }
    
    newDoc( e ){
        e.preventDefault();
        global.DocList.newDoc.call( global.DocList );
    }
    
    render(){
        return (
            <div onClick={ this.newDoc } className="NewDoc btn"><Icon icon={ 'icon-icon_tianjia' } size={ 15 } /><span>New</span></div>
        );
    }
}

class DocListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id || null,
            title:this.props.title || 'Untitle',
            content:this.props.content || '',
            active:true
        };
        
        this.rename = this.rename.bind( this );
        this.remove = this.remove.bind( this );
    }
    
    rename( id ){
        let tar;
        
        global.DocList.state.list.forEach( ( doc ) => ( ( doc.id === id ) && ( tar = doc ) ) );
        
        global.Dialog.open({
            title:'Rename document',
            description:'Type the document name please.',
            status:'renameDoc',
            input:tar.title
        });
    }
    
    remove( id ){
        global.Dialog.open({
            title:'Remove document',
            description:'Did you sure deleted this document?',
            status:'removeDoc'
        });
    }
    
    render(){
        if( !this.state.title ){
            return ;
        }
        
        return (
            <div className={"DocListItem" + ( this.props.active ? ' active' : '' )} onClick={ this.props.onClick }>
                <div className="DocListItemWrap">
                <span>{ this.state.title }</span>
                <div className={"DocListItemActions" + (this.state.active ? ' active' : '')}>
                    <div onClick={ () => this.rename( this.props.id ) } className={"DocListItemAction btn"}>
                        <Icon icon={ 'icon-bianjisekuai' } size={ 17 } />
                    </div>
                    <div onClick={ () => this.remove( this.props.id ) } className={"DocListItemAction btn"}>
                        <Icon icon={ 'icon-shanchu' } size={ 17 } />
                    </div>
                </div>
                </div>
                <p>{ this.props.content }</p>
            </div>
        );
    }
}

class DocList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {
                    id:0,
                    title:'Untitle-0',
                    content:'',
                    active:true
                }
            ],
            results:[],
            keywords:""
        };
        
        this.onActive = this.onActive.bind( this );
    }
    
    componentDidMount(){
        global.DocList = this;
        
        let self = this;
        
        let list = localSync.get();
        
        if( !list.length ){
            return ;
        }
        
        self.setState({
            list:[]
        });
        
        setTimeout( () => {
            self.setState({
                list: list
            });
        }, 50 );
    }
    
    newDoc(){
        let defaultCode = '## Markdown code here';
        
        let list = this.state.list || [],
            idxArr = [];
        
        for( let i = 0; i < list.length; i++ ){
            list[i].active = false;
        }
        
        list.forEach( ( lst ) => {
            idxArr.push( lst.id );
        } );
        
        let max = Math.max.apply( Math, idxArr ),
            idx = max+1;
        
        list.push({
            id:idx,
            title:`Untitle-${ idx }`,
            content:defaultCode,
            active:true
        });
        
        this.setState({
            list:list
        });
        
        if( !global.Editor ){
            return ;
        }
        
        global.Editor.setState({
            id:idx,
            code:defaultCode
        });
    }
    
    onActive( idx ){
        if( !global.Editor ){
            return ;
        }
        
        let lists = this.state.list,
            results = this.state.results,
            lst,
            self = this;
        
        this.state.list.forEach( ( item ) => ( ( item.id === idx ) && ( lst = item ) ) );
        
        for( let i = 0; i < lists.length; i++ ){
            let tar = lists[i];
            tar.active = ( tar.id === idx );
        }
        
        for( let i = 0; i < results.length; i++ ){
            let tar = results[i];
            tar.active = ( tar.id === idx );
        }
        
        this.setState({
            list:[],
            results:[]
        });
        
        setTimeout( () => {
            self.setState({
                list:lists,
                results:results
            });
        }, 50 );
        
        global.Editor.setState({
            id:idx,
            code:lst.content
        });
    }
    
    render(){
        
        let self = this;
        
        let dataList = self.state.keywords ? this.state.results : this.state.list;
        
        let lists = dataList.map( ( item, key ) => ( <DocListItem onClick={ () => self.onActive( item.id ) } content={ item.content } id={ item.id } title={ item.title } active={ item.active } key={ key } /> ) );
         
        return (
            <div className="DocList">
                { lists }
            </div>
        );
    }
}

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false
        };
        
        this.onClose = this.onClose.bind( this );
        this.onChange = this.onChange.bind( this );
    }
    
    componentDidMount(){
        global.Drawer = this;
    }
    
    open(){
        this.setState({
            isOpen:true,
            status:'remove'
        });
    }
    
    onClose(){
        this.setState({
            isOpen:false
        });
    }
    
    onChange( e ){
        
        global.DocList.setState({
            keywords:e.target.value
        });
        
        let dataList = global.DocList.state.list,
            orginalList = global.DocList.state.list,
            newArr = [];
        
        dataList.forEach( ( data ) => {
            
            let title = data.title.toLowerCase(),
                content = data.content.toLowerCase(),
                kw = e.target.value || '';
            
            if( ( title.indexOf(kw) > -1 ) || ( content.indexOf(kw) > -1 ) ){
                newArr.push( data );
            }
            
        } );
        
        dataList = newArr;
        
        global.DocList.setState({
            results:[],
            list:[],
        });
        
        setTimeout( () => {
            global.DocList.setState({
                results: dataList,
                list:orginalList
            });
        }, 50 );
        
    }
    
    render(){
        return (
            <div className={"Drawer" + (this.state.isOpen ? ' active' : '')}>
                <div className="DrawerMask" onClick={ this.onClose }></div>
                <div className="DrawerMenu">
                    <div className="DrawerNew">
                        <NewDoc />
                        <span>Add new MD document</span>
                    </div>
                    <div className="DrawerScrollWrap">
                        <Scrollbars className="DrawerScroll">
                            <DocList />
                        </Scrollbars>
                    </div>
                    <div className="DrawerScrollSearch">
                        <div className="DrawerScrollSearchInput">
                            <input onChange={ this.onChange } type="text" placeholder="Search documents..." />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Drawer;