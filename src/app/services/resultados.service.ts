import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  itemsCollection !: AngularFirestoreCollection<any>;
  puntajes !: Observable<any[]>;

  constructor(private firestore : AngularFirestore) { }

  guardarDatos(data : any){
    this.firestore.collection('resultados').add(data);
  }

  traerResultados(){
    // let itemDoc: AngularFirestoreDocument<any>;
    // let item :Observable<any>;

    // itemDoc = this.firestore.doc<any>(`resultados/d9ejgQ2ZHzjXIzdc3415`);
    // item = itemDoc.valueChanges();
    // item.subscribe(data =>{
    //   console.log(data);
    // })

    

    this.itemsCollection = this.firestore.collection<any>('resultados');
    return this.puntajes = this.itemsCollection.valueChanges({idField:'id'});
  }
}
