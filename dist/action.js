"use strict";var i=Object.create;var u=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var p=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty;var h=(e,t)=>{for(var r in t)u(e,r,{get:t[r],enumerable:!0})},l=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of g(t))!m.call(e,s)&&s!==r&&u(e,s,{get:()=>t[s],enumerable:!(a=f(t,s))||a.enumerable});return e};var I=(e,t,r)=>(r=e!=null?i(p(e)):{},l(t||!e||!e.__esModule?u(r,"default",{value:e,enumerable:!0}):r,e)),O=e=>l(u({},"__esModule",{value:!0}),e);var k={};h(k,{run:()=>d});module.exports=O(k);var o=I(require("@actions/core")),c=require("./");const d=async()=>{try{const e=o.getInput("path-to-source"),t=o.getInput("file-glob"),r=JSON.parse(o.getInput("ignore-patterns")||"[]"),a=o.getInput("cutoff-date"),s=o.getInput("log-level"),n=await(0,c.check)({pathToSource:e,fileGlob:t,ignorePatterns:r,cutoffDate:new Date(a),logLevel:s});if(n.allIssues.length!==0)throw b(n.allIssues),new Error("There are overdue TODOs");o.setOutput("num-passed",n.totalNumberOfPassing),o.setOutput("num-failed",n.totalNumberOfFailing),o.setOutput("num-files-checked",n.numberOfFilesChecked)}catch(e){e instanceof Error&&o.setFailed(e.message)}},b=e=>{e.forEach(t=>{o.error(`[${t.failureReason}]: ${t.issue}`,{title:t.sourceComment,file:t.filePath,startLine:t.lineNumber})})};0&&(module.exports={run});