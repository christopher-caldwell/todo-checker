"use strict";var n=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var F=(t,e)=>{for(var o in e)n(t,o,{get:e[o],enumerable:!0})},d=(t,e,o,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of y(e))!C.call(t,r)&&r!==o&&n(t,r,{get:()=>e[r],enumerable:!(a=P(e,r))||a.enumerable});return t};var O=t=>d(n({},"__esModule",{value:!0}),t);var I={};F(I,{check:()=>D});module.exports=O(I);var g=require("glob"),s=require("./defaults"),i=require("./parseFile");const D=async t=>{const{pathToSource:e=s.pathToSourceDefault,fileGlob:o=s.fileGlobDefault,ignorePatterns:a=s.ignorePatternsDefault,todoValidator:r}=t,b=(0,g.globSync)(o,{ignore:a,root:e});let l=0,u=0,c=0;const f=[];for(const m of b){if(l++,(0,i.checkIfPathIsDir)(m))continue;const{numberOfFailing:p,numberOfPassing:h,issues:k}=await(0,i.parseFile)(m,r);u+=p,c+=h,f.push(...k)}return{numberOfFilesChecked:l,totalNumberOfFailing:u,totalNumberOfPassing:c,allIssues:f}};0&&(module.exports={check});