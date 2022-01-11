import { treeData } from './index'

export const treeNodeIsConform = (treeNode: treeData, filterFun: (treeNode: treeData, filterValue: string) => boolean, filterValue: string): boolean => {
    const { children } = treeNode
    if(children && children.length > 0){
        return filterFun(treeNode, filterValue) || !!children.find(treeItem => treeNodeIsConform(treeItem, filterFun, filterValue))
    }
    return filterFun(treeNode, filterValue)
}

export const filterTreeDataByfilterValue = (treeList: treeData[], filterFun: (treeNode: treeData, filterValue?: string) => boolean, filterValue: string): treeData[] => {
    if(!filterValue || filterValue === '' ) return treeList
    return treeList.filter(treeNode => treeNodeIsConform(treeNode, filterFun, filterValue))
        .map(treeNode => {
            const { children } = treeNode
            if (children && children.length > 0) {
                return {
                    ...treeNode,
                    children: filterFun(treeNode, filterValue) ? children : filterTreeDataByfilterValue(children, filterFun, filterValue)
                }
            } else {
                return treeNode
            }
        })
}

