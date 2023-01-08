`$ updatedb`  
`$ locate file-name` - depends on mlocate.db to index files  

## FIND
`$ find -type [d|f] -size num directory-path -name file-name`  
Type - directory or file   

Find can also use the result as inp to execute cmnd on each result  
`$ find -name "*.swp" -type f -maxdepth 1 -exec rm {}  ';'`
         -exec can be swapped with -ok which will ask for confirm before executing cmnd

? - single character  
Any number of characters  
[abc] - any of three letters in brackets  
Here I can also do [a-z]  range iof chars in b/w a to z  
[!abc] - characters not in the bracket  
Ls?.out - will seach for ls followed by one character and endint with .out  

For example, to find files greater than 10 MB in size and running a command on those files:  
`$ find / -size +10M -exec command {} ’;’`



To search in files  
## GREP
`$ grep -r word directory` - will print all file names & line in file having word in the directory  
`$ grep -v word file` - print all lines in file which do not contain the word  
`$ grep -w word file` - print lines containing the word where the word has white space before & after (exact match)  
`$ grep -vw word file` - all lines which do not contain exact match of word (if line contains word, with some other letters along with it, it will print them since it's not exact match)    
`$ grep -A<<+ve number>>  word file` - will print line containing the word & <<number>> of  lines after it  
`$ grep -B<<+ve number>>  word file` - will print line containing the word & <<number>> of  lines before it  
 -A1 B2 can be chained

## IO
3 data strings when linux cmd is executed  
Std inp - sent along with cmd  
Std op - op of cmd  
Std err - err when cmd fails  

REDIRECT STDOP cmd > file or cmd >> file  
REDIRECT STDERR cmd 2>  file  
To redirect stderr & sdout to same file do  
`$ cmnd > filename 2>&1` or more simplified  
`$ cmnd > & file`

## Pipes
Use stdop of one cmd as stdin of next cmd

`$ cmd | tee file` - will take stdop of first cmd and overwrite contents of file while displaying the contents of second file  
`$ cmd | tee -a file` - will take stdop of first cmd and append contents of file while displaying the contents of second file  

## VIM
Move line to a position in vi  
`:m +line-num` - will move cursor blinking line to line-num
