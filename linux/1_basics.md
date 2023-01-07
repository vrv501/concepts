## List files
`$ ls -lt` (-l - long -t time created from newest to oldest)  
`$ ls -ltr` (same as above except reverse the time created list from oldest to newest)


## Display contents of a file
`$ more file`
 - Display one pageful of contents
 - space to scroll one page
 - enter to scroll one line at a time
 - b to scroll back one page at time
 - /  to search for word

`$less file` 
 - display less contents

## Linux Manuals
Help:
`$ whatis cmnd`  
`$ man cmnd`  
`$ apropos key-word` will search man pages for keyword  
And display list of man pages where the keyword exists

## All things Shell 
`$ chsh -s shell-path`  
Ex: `chsh -s /bin/sh` - will have to log back in to see changes  

Alias  
`$ alias short-command=comnd`  
Ex: alias dt=date  

History  
`$ history` - will display previously executed cmnds  

ENV   
All env vars for curr user can be stored in `~/.profile`  

Customize bash prompt  
Set PS1 ENV var  
`PS1="[\d \t \u@\h \w ] $"`  
\d date, \t time \u username \h hostname \w curr_working_dir  
