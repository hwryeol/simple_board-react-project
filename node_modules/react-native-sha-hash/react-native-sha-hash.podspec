
Pod::Spec.new do |s|
  s.name          = 'react-native-sha-hash'
  s.version       = '1.0.0'
  s.summary       = 'Native module for SHA Hash'
  s.author        = "nixstory@gmail.com"
  s.license       = 'MIT'
  s.requires_arc  = true
  s.homepage      = "https://github.com/reactspring/react-native-sha-hash"
  s.source        = { :git => 'https://github.com/reactspring/react-native-sha-hash' }
  s.platform      = :ios, '9.0'
  s.source_files  = "ios/**/*.{h,m}"

  s.dependency "React"
end
