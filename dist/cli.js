"use strict";var f=Object.create;var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,g=Object.prototype.hasOwnProperty;var y=(t,r,a,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of p(r))!g.call(t,i)&&i!==a&&c(t,i,{get:()=>r[i],enumerable:!(n=u(r,i))||n.enumerable});return t};var v=(t,r,a)=>(a=t!=null?f(m(t)):{},y(r||!t||!t.__esModule?c(a,"default",{value:t,enumerable:!0}):a,t));var o=require("clipanion"),d=require("clipanion"),l=v(require("typanion")),e=require("./defaults");class D extends o.Command{constructor(){super(...arguments);this.pathToSource=o.Option.String("-ps,--pathToSource",e.pathToSourceDefault,{arity:1,tolerateBoolean:!1,description:"Relative path to directory to check"});this.fileGlob=o.Option.String("-g,--glob",e.fileGlobDefault,{description:"Glob Expression to check if a file should be checked",validator:l.isString(),arity:1});this.ignorePatterns=o.Option.Array("-ign,--ignorePatterns",e.ignorePatternsDefault,{description:"File patterns checker will ignore",validator:l.isArray(l.isString())});this.cutoffDate=o.Option.String("-cod,--cutoffDate",e.cutoffDateDefault,{description:"Cutoff date for a todo passing. Defaults to todays date",validator:l.isDate(),arity:1});this.logLevel=o.Option.String("-ll,--logLevel",e.logLevelDefault,{description:"Log level of conversion",arity:1});this.maxNumberOfOverdue=o.Option.String("-mo,--maxOverdue",e.maxNumberOfOverdueDefault,{description:"Maximum number of overdue todos you consider successful",arity:1});this.allowMalformedTodo=o.Option.Boolean("-al,--allowMalformed",e.allowMalformedTodoDefault,{description:"Allow a non-standard todo to be present and still pass"})}async execute(){try{console.log("Yay"),process.exit(0)}catch{process.exit(1)}}}const[b,h,...x]=process.argv,s=new d.Cli({binaryLabel:"TODO Checker",binaryName:`${b} ${h}`});s.register(D),s.register(o.Builtins.HelpCommand),s.runExit(x);
