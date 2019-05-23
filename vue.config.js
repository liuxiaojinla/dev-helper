module.exports = {
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				appId: "com.duoguan.dev",
				copyright: "beidou",
				productName: "dev-helper",
				// afterAllArtifactBuild?, afterPack?, afterSign?, apk?, appId?, appImage?,
				// appx?, artifactBuildCompleted?, artifactBuildStarted?, artifactName?,
				// asar?, asarUnpack?, beforeBuild?, buildDependenciesFromSource?,
				// buildVersion?, compression?, copyright?, cscKeyPassword?, cscLink?,
				// deb?, detectUpdateChannel?, directories?, dmg?, electronCompile?,
				// electronDist?, electronDownload?, electronUpdaterCompatibility?,
				// electronVersion?, extends?, extraFiles?, extraMetadata?, extraResources?,
				// fileAssociations?, files?, forceCodeSigning?, framework?, freebsd?,
				// generateUpdatesFilesForAllChannels?, icon?, includePdb?, launchUiVersion?,
				// linux?, mac?, mas?, msi?, muonVersion?, nodeGypRebuild?, nodeVersion?, npmArgs?,
				// npmRebuild?, npmSkipBuildFromSource?, nsis?, nsisWeb?, onNodeModuleFile?, p5p?,
				// pacman?, pkg?, portable?, productName?, protocols?, protonNodeVersion?,
				// publish?, readonly?, releaseInfo?, remoteBuild?, removePackageScripts?,
				// rpm?, snap?, squirrelWindows?, target?, win?
			},
			mainProcessWatch: ['src/ipc.js'],
		}
	}
};
