ace.define('ace/snippets/perl', ['require', 'exports', 'module'], function (e, t, n) {
  'use strict';
  (t.snippetText =
    "# #!/usr/bin/perl\nsnippet #!\n	#!/usr/bin/env perl\n\n# Hash Pointer\nsnippet .\n	 =>\n# Function\nsnippet sub\n	sub ${1:function_name} {\n		${2:#body ...}\n	}\n# Conditional\nsnippet if\n	if (${1}) {\n		${2:# body...}\n	}\n# Conditional if..else\nsnippet ife\n	if (${1}) {\n		${2:# body...}\n	}\n	else {\n		${3:# else...}\n	}\n# Conditional if..elsif..else\nsnippet ifee\n	if (${1}) {\n		${2:# body...}\n	}\n	elsif (${3}) {\n		${4:# elsif...}\n	}\n	else {\n		${5:# else...}\n	}\n# Conditional One-line\nsnippet xif\n	${1:expression} if ${2:condition};${3}\n# Unless conditional\nsnippet unless\n	unless (${1}) {\n		${2:# body...}\n	}\n# Unless conditional One-line\nsnippet xunless\n	${1:expression} unless ${2:condition};${3}\n# Try/Except\nsnippet eval\n	local $@;\n	eval {\n		${1:# do something risky...}\n	};\n	if (my $e = $@) {\n		${2:# handle failure...}\n	}\n# While Loop\nsnippet wh\n	while (${1}) {\n		${2:# body...}\n	}\n# While Loop One-line\nsnippet xwh\n	${1:expression} while ${2:condition};${3}\n# C-style For Loop\nsnippet cfor\n	for (my $${2:var} = 0; $$2 < ${1:count}; $$2${3:++}) {\n		${4:# body...}\n	}\n# For loop one-line\nsnippet xfor\n	${1:expression} for @${2:array};${3}\n# Foreach Loop\nsnippet for\n	foreach my $${1:x} (@${2:array}) {\n		${3:# body...}\n	}\n# Foreach Loop One-line\nsnippet fore\n	${1:expression} foreach @${2:array};${3}\n# Package\nsnippet package\n	package ${1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`};\n\n	${2}\n\n	1;\n\n	__END__\n# Package syntax perl >= 5.14\nsnippet packagev514\n	package ${1:`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')`} ${2:0.99};\n\n	${3}\n\n	1;\n\n	__END__\n#moose\nsnippet moose\n	use Moose;\n	use namespace::autoclean;\n	${1:#}BEGIN {extends '${2:ParentClass}'};\n\n	${3}\n# parent\nsnippet parent\n	use parent qw(${1:Parent Class});\n# Read File\nsnippet slurp\n	my $${1:var} = do { local $/; open my $file, '<', \"${2:file}\"; <$file> };\n	${3}\n# strict warnings\nsnippet strwar\n	use strict;\n	use warnings;\n# older versioning with perlcritic bypass\nsnippet vers\n	## no critic\n	our $VERSION = '${1:version}';\n	eval $VERSION;\n	## use critic\n# new 'switch' like feature\nsnippet switch\n	use feature 'switch';\n\n# Anonymous subroutine\nsnippet asub\n	sub {\n	 	${1:# body }\n	}\n\n\n\n# Begin block\nsnippet begin\n	BEGIN {\n		${1:# begin body}\n	}\n\n# call package function with some parameter\nsnippet pkgmv\n	__PACKAGE__->${1:package_method}(${2:var})\n\n# call package function without a parameter\nsnippet pkgm\n	__PACKAGE__->${1:package_method}()\n\n# call package \"get_\" function without a parameter\nsnippet pkget\n	__PACKAGE__->get_${1:package_method}()\n\n# call package function with a parameter\nsnippet pkgetv\n	__PACKAGE__->get_${1:package_method}(${2:var})\n\n# complex regex\nsnippet qrx\n	qr/\n	     ${1:regex}\n	/xms\n\n#simpler regex\nsnippet qr/\n	qr/${1:regex}/x\n\n#given\nsnippet given\n	given ($${1:var}) {\n		${2:# cases}\n		${3:# default}\n	}\n\n# switch-like case\nsnippet when\n	when (${1:case}) {\n		${2:# body}\n	}\n\n# hash slice\nsnippet hslice\n	@{ ${1:hash}  }{ ${2:array} }\n\n\n# map\nsnippet map\n	map {  ${2: body }    }  ${1: @array } ;\n\n\n\n# Pod stub\nsnippet ppod\n	=head1 NAME\n\n	${1:ClassName} - ${2:ShortDesc}\n\n	=head1 SYNOPSIS\n\n	  use $1;\n\n	  ${3:# synopsis...}\n\n	=head1 DESCRIPTION\n\n	${4:# longer description...}\n\n\n	=head1 INTERFACE\n\n\n	=head1 DEPENDENCIES\n\n\n	=head1 SEE ALSO\n\n\n# Heading for a subroutine stub\nsnippet psub\n	=head2 ${1:MethodName}\n\n	${2:Summary....}\n\n# Heading for inline subroutine pod\nsnippet psubi\n	=head2 ${1:MethodName}\n\n	${2:Summary...}\n\n\n	=cut\n# inline documented subroutine\nsnippet subpod\n	=head2 $1\n\n	Summary of $1\n\n	=cut\n\n	sub ${1:subroutine_name} {\n		${2:# body...}\n	}\n# Subroutine signature\nsnippet parg\n	=over 2\n\n	=item\n	Arguments\n\n\n	=over 3\n\n	=item\n	C<${1:DataStructure}>\n\n	  ${2:Sample}\n\n\n	=back\n\n\n	=item\n	Return\n\n	=over 3\n\n\n	=item\n	C<${3:...return data}>\n\n\n	=back\n\n\n	=back\n\n\n\n# Moose has\nsnippet has\n	has ${1:attribute} => (\n		is	    => '${2:ro|rw}',\n		isa 	=> '${3:Str|Int|HashRef|ArrayRef|etc}',\n		default => sub {\n			${4:defaultvalue}\n		},\n		${5:# other attributes}\n	);\n\n\n# override\nsnippet override\n	override ${1:attribute} => sub {\n		${2:# my $self = shift;};\n		${3:# my ($self, $args) = @_;};\n	};\n\n\n# use test classes\nsnippet tuse\n	use Test::More;\n	use Test::Deep; # (); # uncomment to stop prototype errors\n	use Test::Exception;\n\n# local test lib\nsnippet tlib\n	use lib qw{ ./t/lib };\n\n#test methods\nsnippet tmeths\n	$ENV{TEST_METHOD} = '${1:regex}';\n\n# runtestclass\nsnippet trunner\n	use ${1:test_class};\n	$1->runtests();\n\n# Test::Class-style test\nsnippet tsub\n	sub t${1:number}_${2:test_case} :Test(${3:num_of_tests}) {\n		my $self = shift;\n		${4:#  body}\n\n	}\n\n# Test::Routine-style test\nsnippet trsub\n	test ${1:test_name} => { description => '${2:Description of test.}'} => sub {\n		my ($self) = @_;\n		${3:# test code}\n	};\n\n#prep test method\nsnippet tprep\n	sub prep${1:number}_${2:test_case} :Test(startup) {\n		my $self = shift;\n		${4:#  body}\n	}\n\n# cause failures to print stack trace\nsnippet debug_trace\n	use Carp; # 'verbose';\n	# cloak \"die\"\n	# warn \"warning\"\n	$SIG{'__DIE__'} = sub {\n		require Carp; Carp::confess\n	};\n\n"),
    (t.scope = 'perl');
});
