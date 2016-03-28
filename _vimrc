set ts=4 et sw=4 sts=4
set autoindent
set nu
set ruler
set backspace=2
syntax on
colorscheme molokai
if !has("gui_running")
    set term=xterm
    set t_Co=256
    let &t_AB="\e[48;5;%dm"
    let &t_AF="\e[38;5;%dm"
else
    set guifont=Consolas:h10
    set guioptions-=T  "remove toolbar
endif
