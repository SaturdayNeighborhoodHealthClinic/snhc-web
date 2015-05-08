cd $HOME
cat update.latest >> update.log

exec &> update.latest
cd $HOME

echo -n "UPDATE:"
date

rm -rf $( ls | grep -v bower_components | grep -v update.log | grep -v update.latest )
wget --no-check-certificate https://github.com/SaturdayNeghborhoodHealthClinic/snhc-web/archive/master.zip
unzip master
rm -r master
mv snhc-web-master/app/* .
mv snhc-web-master/update.sh .
rm -rf snhc-web-master
