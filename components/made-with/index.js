import { Box, Text } from '@chakra-ui/layout'
import LogoSvg from '../../assets/logo'

const MadeWith = () => {
  return (
    <Box>
      <a target="_blank" href="https://standout-resume.now.sh" rel="noreferrer">
        <Box
          d="flex"
          pos="fixed"
          bottom="1rem"
          right="2rem"
          fontSize="xs"
          bg="white"
          border="1px solid"
          borderColor="#eff1f4"
          borderRadius="5px"
          p="8px 10px"
          fontWeight="400"
          boxShadow="3px 3px 10px 3px rgba(56,28,100,0.1)"
          alignItems="center"
        >
          <Box mr="6px">
            <LogoSvg width="14px" />
          </Box>
          Made with
          <Text ml="4px" color="primary.500" fontWeight="700">
            Standout
          </Text>
        </Box>
      </a>
    </Box>
  )
}

export default MadeWith
