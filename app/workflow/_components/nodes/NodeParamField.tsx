"use client"
import { TaskParam, TaskParamsType } from '../../../types/task'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '../../../types/appNode';
import BrowserInstanceParam from './param/BrowserInstanceParam';
import SelectParam from './param/SelectParam';
import CredentialParam from './param/CredentialParam';

const NodeParamField = ({param , nodeId, disabled} : {param: TaskParam , nodeId: string , disabled: boolean}) => {
    const { updateNodeData , getNode} = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name];
    
    const updateNodeParamValue = useCallback((newValue: string) => {
                updateNodeData(nodeId , {
                    inputs: {
                        ...node?.data.inputs,
                        [param.name]: newValue,
                    }
                })
     } , [nodeId , updateNodeData , param.name , node?.data.inputs]);

       switch (param.type) {
        case TaskParamsType.STRING:
        return <StringParam 
                     param={param}
                     value={value}
                     updateNodeParamValue={updateNodeParamValue}
                     disabled={disabled}
               />;
        case TaskParamsType.BROWSER_INSTANCE:
            return(
                <BrowserInstanceParam 
                     param={param}
                     value={""}
                     updateNodeParamValue={updateNodeParamValue}
                />
            );
        case TaskParamsType.SELECT:
              return(
                <SelectParam 
                    param={param}
                    value={value}
                    updateNodeParamValue={updateNodeParamValue}
                    disabled={disabled}
                />
              )
        case TaskParamsType.CREDENTIAL:
              return(
                <CredentialParam 
                    param={param}
                    value={value}
                    updateNodeParamValue={updateNodeParamValue}
                    disabled={disabled}
                />
              )
        default:
            return(
                <div className='w-full'>
                    <p className='text-xs text-muted-foreground'>Not Implemented</p>
                </div>
            )
       }
}

export default NodeParamField