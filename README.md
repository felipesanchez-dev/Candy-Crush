Este es un nuevo proyecto de [**React Native**](https://reactnative.dev), creado usando [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Comenzando

> **Nota**: Asegúrate de haber completado la guía [Configurar tu Entorno](https://reactnative.dev/docs/set-up-your-environment) antes de continuar.

## Paso 1: Iniciar Metro

Primero, necesitarás ejecutar **Metro**, la herramienta de construcción de JavaScript para React Native.

Para iniciar el servidor de desarrollo Metro, ejecuta el siguiente comando desde la raíz de tu proyecto React Native:

```sh
# Usando npm
npm start

# O usando Yarn
yarn start
```

## Paso 2: Construir y ejecutar tu aplicación

Con Metro ejecutándose, abre una nueva ventana/panel de terminal desde la raíz de tu proyecto React Native, y usa uno de los siguientes comandos para construir y ejecutar tu aplicación Android o iOS:

### Android

```sh
# Usando npm
npm run android

# O usando Yarn
yarn android
```

### iOS

Para iOS, recuerda instalar las dependencias de CocoaPods (esto solo necesita ejecutarse en el primer clon o después de actualizar dependencias nativas).

La primera vez que crees un nuevo proyecto, ejecuta el bundler de Ruby para instalar CocoaPods:

```sh
bundle install
```

Luego, cada vez que actualices tus dependencias nativas, ejecuta:

```sh
bundle exec pod install
```

Para más información, visita la [guía de introducción de CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Usando npm
npm run ios

# O usando Yarn
yarn ios
```

Si todo está configurado correctamente, deberías ver tu nueva aplicación ejecutándose en el Emulador de Android, Simulador de iOS, o tu dispositivo conectado.

Esta es una forma de ejecutar tu aplicación — también puedes construirla directamente desde Android Studio o Xcode.

## Paso 3: Modificar tu aplicación

¡Ahora que has ejecutado exitosamente la aplicación, hagamos algunos cambios!

Abre `App.tsx` en tu editor de texto favorito y haz algunos cambios. Cuando guardes, tu aplicación se actualizará automáticamente y reflejará estos cambios — esto es posible gracias a [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Cuando quieras forzar una recarga, por ejemplo para reiniciar el estado de tu aplicación, puedes realizar una recarga completa:

- **Android**: Presiona la tecla <kbd>R</kbd> dos veces o selecciona **"Reload"** del **Menú de Desarrollo**, accesible vía <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) o <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Presiona <kbd>R</kbd> en el Simulador de iOS.

## ¡Felicitaciones! :tada:

Has ejecutado y modificado exitosamente tu aplicación React Native. :partying_face:

### ¿Y ahora qué?

- Si quieres agregar este nuevo código React Native a una aplicación existente, revisa la [guía de Integración](https://reactnative.dev/docs/integration-with-existing-apps).
- Si tienes curiosidad por aprender más sobre React Native, revisa la [documentación](https://reactnative.dev/docs/getting-started).

# Solución de Problemas

Si tienes problemas para hacer funcionar los pasos anteriores, consulta la página de [Solución de Problemas](https://reactnative.dev/docs/troubleshooting).

# Aprende Más

Para aprender más sobre React Native, echa un vistazo a los siguientes recursos:

- [Sitio Web de React Native](https://reactnative.dev) - aprende más sobre React Native.
- [Comenzando](https://reactnative.dev/docs/environment-setup) - una **visión general** de React Native y cómo configurar tu entorno.
- [Aprende lo Básico](https://reactnative.dev/docs/getting-started) - un **tour guiado** de los **conceptos básicos** de React Native.
- [Blog](https://reactnative.dev/blog) - lee las últimas publicaciones oficiales del **Blog** de React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - el **repositorio** de GitHub de código abierto para React Native.