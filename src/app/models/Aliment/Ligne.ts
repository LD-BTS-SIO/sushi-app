import { Box } from "./Box"

export class Ligne{
    qte:number
    box:Box

    constructor(qte:number,box:Box){
        this.box=box
        this.qte=qte
    }
}