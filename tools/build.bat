@chcp 65001
pushd
setlocal
cd %~dp0..
call efront build %*
for /d %%i in (..\yunxu1019.github.io\*) do rd /s /q %%i
xcopy /s /y /q public ..\yunxu1019.github.io\
cd ..\yunxu1019.github.io\
git checkout --orphan clean
git branch -D master
git branch -m master
git add .
git commit -m 新版本
git push --set-upstream origin master --force
endlocal
popd