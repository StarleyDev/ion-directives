# Ion-directives

São directivas para uso em ionic, para mascramento de inputs, pressHold, tap, doubleTap, connector sqlite pwa, gerenciamento de datas e remover algo do input!

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## Authors

- [@starleydev](https://www.github.com/starleyDev)

## Installation

```bash
  npm i @starley/ion-directives
```

## Usage/Examples

Importe dentro do modulo que ira utilizar

my-component.module.ts

```typescript
import { DirectivesModule } from '@starley/ion-directives';


@NgModule({
    ...
    imports: [
        ...,
        DirectivesModule
    ],
    ...
})
export class MyComponent {}
```

### Para usar a mascara 'appMask'

Adicione dentro do input a chamada passando após o simbolo de '=' a formatação desejada!

my-component.html

```html
<ion-content>
  ...
  <ion-item>
    <ion-label>CPF</ion-label>
    <ion-input
      class="ion-text-right"
      [(ngModel)]="cpf"
      maxlength="14"
      type="number"
      placeholder="000.000.000-00"
      appMask="***.***.***-**"
    ></ion-input>
  </ion-item>
  ...
</ion-content>
```

Resultado --> 123.456.789-00

### Para usar a pressHold 'appPressHold'

O tempo minimo e de 450 milisegundos!

Caso queria alterar o tempo minimo basta adicionar o tempo desejado

Adicione a chamada de 'appPressHold' juntamente com o '(press)' pois ele será o responsavel pela ação!

my-component.html

```html
<ion-content>
    ...
    <ion-item appPressHold (press)="doSomething()>
      <ion-label>PressHold</ion-label>
    </ion-item>
    ...

     ... Caso queria usar com tempo definido
    <ion-item appPressHold="250" (press)="doSomething()>
      <ion-label>PressHold</ion-label>
    </ion-item>
    ...
</ion-content>
```

### Para usar 'appTap'

Adicione dentro de um elemento qualquer! Ao adicionar você tera duas opções!

_O (tap) tera ação de intervalo de 250 milisegundos_

_O (doubleTap) terá ação de intervalo de 300 milisegundos_

my-component.html

```html
<ion-content>
  ...
  <ion-content>
    ...
    <ion-item appTap (tap)="doSomething()" (doubleTap)="doSomething()">
      <ion-label>tap</ion-label>
    </ion-item>
    ...
  </ion-content>
  ...
</ion-content>
```

### Para usar 'appTap'

Adicione dentro de um elemento qualquer! Ao adicionar você tera duas opções!

_O (tap) tera ação de intervalo de 250 milisegundos_

_O (doubleTap) terá ação de intervalo de 300 milisegundos_

my-component.html

```html
<ion-content>
  ...
  <ion-content>
    ...
    <ion-item appTap (tap)="doSomething()" (doubleTap)="doSomething()">
      <ion-label>tap</ion-label>
    </ion-item>
    ...
  </ion-content>
  ...
</ion-content>
```

### Para usar 'appRemoveFromInput'

Agora você poderá remover letras, numeros, caracteres especiais ou um texto qualquer de um input!

- -> "letter" : Remove qualquer caracteres que sejam do alfabeto;
- -> "number" Remove tudo que for digito;
- -> "special" : Remove tudo que for caractreres especiais;
- -> "punctuation" : Remove tudo que for pontuação (.,!?'"():;\_-)
- Caso queria remover uma determinada sequencia basta colocar o texto que quiser que ele ira remover o que foi definido!

my-component.html

```html
<ion-content>
  ...
  <ion-content>
    ...
    <ion-input appRemoveFromInput="letter"> </ion-input>
    ...
  </ion-content>
  ...
</ion-content>
```

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
