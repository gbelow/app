# App-Atacado
Aplicação mobile para as marcas do grupo

# Knowledge issues and how to solve them:

## When pod install error be like this:
CocoaPods could not find compatible versions for pod "React/Core":
Delete ios/Pods folder, delete podfile.lock, delete node_modules,
after yarn run in root:
grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'

——————————————————————

## Build iOS react-native command line:
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

—————————————————————

## Use this command every time you change project branch to another brand:
rm -rf node_modules; rm -rf yarn.lock ; yarn; cd ios; rm -rf Podfile.lock; rm -rf Pods; cd .. ; grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g' ; cd ios; pod install; cd .. ;

—————————

If you wanna change the project name o xproj, go to Xcode and change the project Identity name , but you need to change the schema name to match the project.

————————

If occurs error when try to run iOS because something about schema
Go to Xcode, then in Product > schema > new schema , create one with the project name

———————

When post run occurs a metro error, make sure you match the project name inside /iOS/projname/delegate.m with root/app.json too.

-------

When after archive if the build does not appearing in apple store connect, make sure your Info.plist is well described the usage of cellphone components




